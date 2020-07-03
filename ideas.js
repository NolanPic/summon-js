// Some code thoughts for how summon will be used

import { Summon } from "./summon";

const config = {
  summons: [
    {
      name: "Navigate to page",
      cmd: "n",
      args: ["page"],
      handle: (args) => {
        // 'args' could be simplified to '{ page }'
      },
    },
  ],
};

const AppDashboard = () => {
  return <Summon config={config} />;
};

// ^^^^ Would output a command prompt that, when you typed ""

export default AppDashboard;
