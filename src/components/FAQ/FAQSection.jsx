import React from "react";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const FAQSection = ({ section }) => {
  const getItems = (section) => {
    return section.questions.map((q) => ({
      key: `${section.id}-${q.id}`,
      label: (
        <div className="flex justify-between items-center w-full">
          <span className="font-medium text-gray-800 pr-4 text-base">
            {q.id}. {q.question}
          </span>
        </div>
      ),
      children: (
        <div className="bg-white rounded-md p-4 border-t border-gray-200">
          <p className="whitespace-pre-line text-gray-600 leading-relaxed">
            {q.answer}
          </p>
        </div>
      ),
    }));
  };

  return (
    <div className="mb-8 border-l-4 border-blue-500 pl-4">
      <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 text-blue-700">
        {section.title}
      </h2>
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined
            rotate={isActive ? 90 : 0}
            className={`${
              isActive ? "text-blue-500" : "text-gray-400"
            } transform transition-all duration-300`}
          />
        )}
        className="bg-transparent space-y-2"
        ghost
        items={getItems(section)}
      />
    </div>
  );
};

export default FAQSection;
