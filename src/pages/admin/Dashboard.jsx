import { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { ManageCategoryContent, ManageProductContent } from "../../components";

const tabData = [
  {
    label: "კატეგორიების მართვა",
    value: "categories",
    icon: TbCategoryPlus,
    content: <ManageCategoryContent />,
  },
  {
    label: "პროდუქტის მართვა",
    value: "products",
    icon: MdOutlineProductionQuantityLimits,
    content: <ManageProductContent />,
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("categories");

  const handleTabChange = (value) => {
    console.log("Tab changed to:", value);
    setActiveTab(value);
  };

  return (
    <Tabs value={activeTab}>
      <TabsHeader>
        {tabData.map(({ label, value, icon: Icon }) => (
          <Tab key={value} value={value} onClick={() => handleTabChange(value)}>
            <div className="flex items-center gap-2">
              <Icon className="text-lg" />
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>

      <TabsBody>
        {tabData.map(({ value, content }) => (
          <TabPanel key={value} value={value}>
            {content}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default Dashboard;
