import { Card } from "antd";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Filters from "../components/filters";
import TableComponent from "../components/tableComponent";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dropDownOptions, setDropDownOptions] = useState({
    actionType: [],
    applicationType: [],
  });

  return (
    <Card>
      <Filters
        searchParams={searchParams}
        dropDownOptions={dropDownOptions}
        setSearchParams={setSearchParams}
      />
      <TableComponent
        searchParams={searchParams}
        setDropDownOptions={setDropDownOptions}
      />
    </Card>
  );
}

export default App;
