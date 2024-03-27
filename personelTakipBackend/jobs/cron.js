import cron from "node-cron";
import User from "../models/User.model.js";
import Week from "../models/Week.model.js";
import Month from "../models/Month.model.js";

cron.schedule("26 16 * * *", async () => {
  const user = await User.find().sort({ userPoints: -1 });
  const week = await Week.create({ leaderBoard: user });

  // const pushToMonth = await Month.findOne({
  //   monthNumber: new Date().getMonth() + 1,
  // });
  // pushToMonth.weeks.push(week);

  console.log(`Job Running ${week}`);
});

//TODO: Aylık Cron Calisti, Burada Aylık Liderleri Getirecegiz.
cron.schedule("19 18 * * *", async () => {
  const week = await Week.find({ monthNumber: new Date().getMonth() + 1 }).sort(
    { createdAt: -1 }
  );

  const month = await Month.create({
    monthNumber: new Date().getMonth() + 1,
    weeks: week,
  });

  console.log(`Job Running ${month}`);
});
export default cron;
