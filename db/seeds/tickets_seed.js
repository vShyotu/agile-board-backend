exports.seed = function (knex) {
  return knex("tickets")
    .del()
    .then(() => {
      return knex("tickets").insert([
        {
          id: 1,
          title: "First Story",
          type: "Story",
          description: "My first story",
        },
        {
          id: 2,
          title: "Second Story",
          type: "Story",
          description: "My second story",
        },
        {
          id: 3,
          title: "First Technical Task",
          type: "Technical Task",
          description: "My first story",
        },
      ]);
    });
};
