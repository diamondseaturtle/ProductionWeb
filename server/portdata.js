const shortPDesc = `Lorem id sint aliqua tempor tempor sit. Ad dolor dolor ut nulla mollit dolore non eiusmod Lorem tempor nisi cillum.`;
const portdata = {};
const longPDesc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
  non enim praesent elementum facilisis leo vel. Risus at ultrices mi
  tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
  tellus. Convallis convallis tellus id interdum velit laoreet id donec
  ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
  suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
  quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
  proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
  tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
  varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
  Lorem donec massa sapien faucibus et molestie ac.`;

// This class holds sample data used by some generated pages to show how they can be used.
// TODO Web Template Studio: Delete this file once your app is using real data.
portdata.textAssets = [
  {
    shortDescription: "A drawing of my original character.",
    longDescription: longPDesc,
    title: "RobotGirl",
    status: "Closed",
    shipTo: "Francisco Pérez-Olaeta",
    orderTotal: 2490.0,
    orderDate: new Date(2017, 5, 24).toDateString(),
    id: 1,
    image: "lowq5.png"
  },
  {
    shortDescription: "Fanart of the game Gris.",
    longDescription: longPDesc,
    title: "GRIS",
    status: "Closed",
    shipTo: "Soo Jung Lee",
    orderTotal: 1760.0,
    orderDate: new Date(2017, 5, 24).toDateString(),
    id: 2,
    image: "doc.jpg"
  }
];

module.exports = portdata;
