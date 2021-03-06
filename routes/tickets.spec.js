const knex = require("../db/connection");
const request = require("supertest");
const app = require("../app");
const { addTicket, countTickets } = require("../db/queries/tickets");

describe("Tickets routes", () => {
  let server;

  beforeAll(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    server = app.listen();
  });

  afterAll(async () => {
    await knex.destroy();
    server.close();
  });

  describe("GET /api/v1/tickets", () => {
    it("should return all tickets", async () => {
      const response = await request(server).get("/api/v1/tickets");

      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");

      response.body.data.forEach((ticket) => {
        expect(ticket).toHaveProperty("id");
        expect(ticket).toHaveProperty("title");
        expect(ticket).toHaveProperty("type");
        expect(ticket).toHaveProperty("description");
      });
    });
  });

  describe("GET /api/v1/tickets/:id", () => {
    it("should return a ticket with the given id", async () => {
      const response = await request(server).get("/api/v1/tickets/1");

      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body.data).toMatchObject({
        id: 1,
        title: "First Story",
        type: "Story",
        description: "My first story",
      });
    });

    it("should return an error 404 if the ticket with the given id doesn't exist", async () => {
      const response = await request(server).get("/api/v1/tickets/999999999");

      expect(response.status).toBe(404);
      expect(response.body.errors.length).toBe(1);
    });
  });

  describe("POST /api/v1/tickets", () => {
    it("should return the ticket that was created", async () => {
      const data = {
        title: "New Story",
        type: "Story",
        description: "A new story",
      };

      const response = await request(server).post("/api/v1/tickets").send(data);

      expect(response.status).toBe(201);
      expect(response.type).toBe("application/json");
      expect(response.body.data).toMatchObject(data);
      expect(response.body.data).toHaveProperty("id");
    });

    it("should return an error 400 if the payload is invalid", async () => {
      const data = {
        title: "New Story",
      };

      const response = await request(server).post("/api/v1/tickets").send(data);

      expect(response.status).toBe(400);
      expect(response.type).toBe("application/json");
      expect(response.body.errors.length).toBe(1);
    });
  });

  describe("PUT /api/v1/tickets/:id", () => {
    it("should return the ticket that was updated", async () => {
      const data = {
        title: "Updated Story",
        type: "Story",
        description: "An updated story",
      };

      const response = await request(server)
        .put("/api/v1/tickets/2")
        .send(data);

      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body.data).toMatchObject(data);
      expect(response.body.data).toHaveProperty("id", 2);
    });

    it("should throw an error 404 if the ticket doesn't exist", async () => {
      const data = {
        title: "Updated Story",
        type: "Story",
        description: "An updated story",
      };

      const response = await request(server)
        .put("/api/v1/tickets/999999999")
        .send(data);

      expect(response.status).toBe(404);
      expect(response.type).toBe("application/json");
      expect(response.body.errors.length).toBe(1);
    });
  });

  describe("DELETE /api/v1/tickets/:id", () => {
    it("should return the ticket that was deleted", async () => {
      // Create ticket to delete
      const tickets = await addTicket({
        title: "delete",
        type: "delete",
        description: "delete",
      });
      const id = tickets[0].id;

      const countBefore = await countTickets();
      const response = await request(server).delete(`/api/v1/tickets/${id}`);
      const countAfter = await countTickets();

      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
      expect(response.body.data).toHaveProperty("id", id);
      expect(response.body.data).toHaveProperty("title");
      expect(response.body.data).toHaveProperty("type");
      expect(response.body.data).toHaveProperty("description");
      expect(response.body.data).toHaveProperty("created_at");
      expect(response.body.data).toHaveProperty("updated_at");
      expect(countBefore - 1).toEqual(countAfter);
    });

    it("should throw an error 404 if the ticket doesn't exist", async () => {
      const countBefore = await countTickets();
      const response = await request(server).delete(`/api/v1/tickets/9999999`);
      const countAfter = await countTickets();

      expect(response.status).toBe(404);
      expect(response.type).toBe("application/json");
      expect(response.body.errors.length).toBe(1);
      expect(countBefore).toEqual(countAfter);
    });
  });
});
