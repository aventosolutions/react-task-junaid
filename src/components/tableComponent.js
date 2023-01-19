import { message, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import K from "../utilities/constants";
import {
  dateSorting,
  numberSorting,
  stringSorting,
} from "../utilities/tableUtility";
import moment from "moment";

export default function TableComponent({ searchParams, setDropDownOptions }) {
  const [pageStates, setPageStates] = useState({
    loading: true,
    sourceData: [],
    filteredData: [],
  });

  const columns = [
    {
      title: "Log ID",
      dataIndex: "logId",
      align: "center",
      sorter: (a, b) => numberSorting(a, b, "logId"),
    },
    {
      title: "Application Type",
      dataIndex: "applicationType",
      align: "center",
      sorter: (a, b) => stringSorting(a, b, "applicationType"),
    },
    {
      title: "Application ID",
      dataIndex: "applicationId",
      align: "center",
      sorter: (a, b) => numberSorting(a, b, "applicationId"),
    },
    {
      title: "Action",
      dataIndex: "actionType",
      align: "center",
      sorter: (a, b) => stringSorting(a, b, "actionType"),
    },
    {
      title: "Date: Time",
      dataIndex: "creationTimestamp",
      align: "center",
      sorter: (a, b) => dateSorting(a, b, "creationTimestamp"),
    },
  ];

  const applyFilters = (source) => {
    const actionType =
      searchParams.has("actionType") && searchParams.get("actionType");
    const applicationType =
      searchParams.has("applicationType") &&
      searchParams.get("applicationType");
    const applicationId =
      searchParams.has("applicationId") && searchParams.get("applicationId");
    const toDate =
      searchParams.has("to") &&
      moment(searchParams.get("to")).format(K.Formats.Date.YYYYMMDD);
    const fromDate =
      searchParams.has("from") &&
      moment(searchParams.get("from")).format(K.Formats.Date.YYYYMMDD);

    return source.filter(
      (item) =>
        item.actionType === actionType ||
        item.applicationType === applicationType ||
        item.applicationId === +applicationId ||
        moment(item.creationTimestamp).isBetween(fromDate, toDate)
    );
  };

  const populateOptions = (logs) => {
    const { actionType, applicationType } = logs.reduce(
      (prev, curr) => ({
        actionType: [...prev.actionType, curr.actionType],
        applicationType: [...prev.applicationType, curr.applicationType],
      }),
      { actionType: [], applicationType: [] }
    );
    setDropDownOptions((prev) => ({
      ...prev,
      actionType: [...new Set(actionType)],
      applicationType: [...new Set(applicationType)],
    }));
  };

  const getLogs = async () => {
    try {
      const res = await axios.get(K.API.GetLogs);
      populateOptions(res.data.result.auditLog);
      setPageStates((prev) => ({
        ...prev,
        loading: false,
        sourceData: res.data.result.auditLog,
        filteredData: window.location.search
          ? applyFilters(res.data.result.auditLog)
          : res.data.result.auditLog,
      }));
    } catch (error) {
      console.error(error);
      message.error(error.message);
      setPageStates((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  useEffect(() => {
    if (pageStates.sourceData.length) {
      if (window.location.search) {
        setPageStates((prev) => {
          return {
            ...prev,
            filteredData: applyFilters(prev.sourceData),
          };
        });
      } else {
        setPageStates((prev) => {
          return {
            ...prev,
            filteredData: prev.sourceData,
          };
        });
      }
    }
  }, [searchParams]);

  return (
    <Table
      bordered
      loading={pageStates.loading}
      columns={columns}
      dataSource={pageStates.filteredData}
      scroll={{ x: 500 }}
    />
  );
}
