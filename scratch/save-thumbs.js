const fs = require('fs');
const d = JSON.parse(fs.readFileSync('scratch/lh-mobile.json'));
d.audits['screenshot-thumbnails'].details.items.forEach((item, index) => {
  const base64Data = item.data.replace(/^data:image\/jpeg;base64,/, '');
  fs.writeFileSync(`scratch/thumb-${index}-${item.timing}ms.jpg`, base64Data, 'base64');
  console.log(`Saved thumb-${index}-${item.timing}ms.jpg`);
});
