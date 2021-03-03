
const SiteViews = require("./mongoModelVisits");

siteViewup = function() {
  SiteViews.findByIdAndUpdate('603c7ee41f065d34dc94bb58', {$inc: {counter: 1}}, {new:true})
  .then((data)=>{
    console.log(data.counter)
  })
  .catch((err)=>{console.log(err)});
}

module.exports = { siteViewup };
