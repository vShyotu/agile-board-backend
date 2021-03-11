exports.seed = function (knex) {
  return knex("tickets")
    .del()
    .then(() => {
      return knex("tickets").insert([
        {
          title: "First Story",
          type: "Story",
          description: "My first story",
        },
        {
          title: "Second Story",
          type: "Story",
          description: "My second story",
        },
        {
          title: "First Technical Task",
          type: "Technical Task",
          description: "My first technical task",
        },
      ]);
    });
};
