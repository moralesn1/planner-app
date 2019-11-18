const express = require("express");
const router = express.Router();
const Schedule = require("../models/schedule");

// Index
router.get("/", async (req, res) => {
  try {
    const schedules = await Schedule.find({});
    res.render("schedules/index", { schedules: schedules });
  } catch {
    res.redirect("/");
  }
});

// New
router.get("/new", (req, res) => {
  res.render("schedules/new", { schedule: new Schedule() });
});

// Create
router.post("/", async (req, res) => {
  const schedule = new Schedule({
    title: req.body.title,
    entry: req.body.entry
  });

  try {
    const newSchedule = await schedule.save();
    res.redirect(`schedules/${newSchedule.id}`);
  } catch (err) {
    console.log(err);
    res.render("schedules/new", {
      schedule: schedule,
      errorMessage: "Error creating entry."
    });
  }
});

// Show
router.get("/:id", async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    res.render("schedules/show", {
      schedule: schedule
    });
  } catch {
    res.redirect("/");
  }
});

// Edit
router.get("/:id/edit", async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    res.render("schedules/edit", { schedule: schedule });
  } catch (err) {
    console.log(err);
    res.redirect("/schedules");
  }
});

// Update
router.put("/:id", async (req, res) => {
  let schedule;

  try {
    schedule = await Schedule.findById(req.params.id);
    schedule.title = req.body.title;
    schedule.entry = req.body.entry;
    await schedule.save();
    res.redirect(`/schedules/${schedule.id}`);
  } catch (err) {
    if (schedule == null) {
      res.redirect("/");
    } else {
      console.log(err);
      res.render("schedules/new", {
        schedule: schedule,
        errorMessage: "Error Updating entry."
      });
    }
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  let schedule;
  try {
    schedule = await Schedule.findById(req.params.id);
    await schedule.remove();
    res.redirect("/schedules");
  } catch {
    if (schedule == null) {
      res.redirect("/");
    } else {
      res.redirect(`/schedules/${schedule.id}`);
    }
  }
});

module.exports = router;
