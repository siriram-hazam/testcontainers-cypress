const { exec } = require("child_process");

const testcontainerDbPlugin1 = require("./testcontainer_db_1");
// const testcontainerDbPlugin2 = require("./testcontainer_db_2");

// const anotherPlugin = require("./another_plugin");

module.exports = (on, config) => {
  // เรียกใช้ plugin ต่างๆ
  testcontainerDbPlugin1(on, config);
  // testcontainerDbPlugin2(on, config);
  //   anotherPlugin(on, config);

  // คุณสามารถเพิ่ม plugin อื่นๆ ได้ที่นี่
};
