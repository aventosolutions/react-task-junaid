import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import moment from "moment";
import K from "../utilities/constants";

export default function Filters({
  searchParams,
  setSearchParams,
  dropDownOptions,
}) {
  const getInitialValues = () => {
    const initialValues = Object.fromEntries([...searchParams]);
    if ("to" in initialValues) initialValues.to = moment(initialValues.to);
    if ("from" in initialValues)
      initialValues.from = moment(initialValues.from);
    return initialValues;
  };
  const onFinish = (values) => {
    values.to = values.to?.format(K.Formats.Date.YYYYMMDD) ?? undefined;
    values.from = values.from?.format(K.Formats.Date.YYYYMMDD) ?? undefined;
    if (values.applicationId === "") values.applicationId = undefined;

    // * Removing keys with undefined values
    const params = JSON.parse(JSON.stringify(values));

    setSearchParams(params);
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={getInitialValues()}
    >
      <Row align="middle" style={{ marginBottom: "16px" }} gutter={[16, 16]}>
        {/* <Col xs={8} sm={6} md={6} lg={3} xl={3}>
          <Form.Item name="employeeName" label="Employee Name">
            <Input />
          </Form.Item>
        </Col> */}
        <Col xs={24} sm={12} md={8} lg={4}>
          <Form.Item name="actionType" label="Action Type">
            <Select
              placeholder="Select Action Type"
              allowClear
              options={dropDownOptions.actionType
                .filter(Boolean)
                .map((item) => ({
                  label: item,
                  value: item,
                }))}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Form.Item name="applicationType" label="Application Type">
            <Select
              placeholder="Select Application Type"
              allowClear
              options={dropDownOptions.applicationType
                .filter(Boolean)
                .map((item) => ({
                  label: item,
                  value: item,
                }))}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Form.Item name="from" label="From Date">
            <DatePicker
              style={{ width: "100%" }}
              format={K.Formats.Date.YYYYDDMM}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Form.Item name="to" label="To Date">
            <DatePicker
              style={{ width: "100%" }}
              format={K.Formats.Date.YYYYDDMM}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Form.Item name="applicationId" label="Application ID">
            <Input placeholder="Application ID" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Form.Item label=" ">
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              Search Logger
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
