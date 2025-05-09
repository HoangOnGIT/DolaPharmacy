import { Card, Checkbox, Form } from "antd";
import React, { useState, useEffect } from "react";
import "./FilterContent.css";

function FilterContent({ filterObj, onChange, filtering }) {
  const [selectedValues, setSelectedValues] = useState([]);

  function handleChange(checkedValues) {
    onChange(checkedValues, filterObj.queryParam);
    setSelectedValues(checkedValues);
  }

  useEffect(() => {
    // Reset selectedValues to only include valid options or clear if options are empty
    setSelectedValues(filtering);
  }, [filtering]);

  return (
    <div className="ring-1 ring-blue-800 rounded-[5px] ">
      <div className="card__header bg-blue-800 font-semibold text-white text-[13px] p-2">
        <span>{filterObj.title}</span>
      </div>
      <div className="max-h-50 px-3 py-1 overflow-y-auto custom-scrollbar text-[13px] ">
        <Form className="!flex !justify-center !w-fit">
          <ul className="list-none space-y-1.5">
            {filterObj.options && (
              <Checkbox.Group
                options={filterObj.options.map((option) =>
                  typeof option === "string"
                    ? {
                        label: <span className="font-semibold">{option}</span>,
                        value: option,
                      }
                    : {
                        ...option,
                        label: (
                          <span className="font-semibold">{option.label}</span>
                        ),
                      }
                )}
                value={selectedValues}
                onChange={(e) => handleChange(e)}
              />
            )}
          </ul>
        </Form>
      </div>
    </div>
  );
}

export default FilterContent;
