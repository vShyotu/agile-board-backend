const request = require("supertest");
const server = require("./app");

afterAll(() => {
  server.close();
});

describe("App", () => {
  describe("/heartbeat route", () => {
    it("should respond with status 200", async () => {
      const response = await request(server)
        .get("/heartbeat")
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
    });

    it("should respond with a correct response", async () => {
      const expectedResponse = {
        serviceName: "agile-board-backend",
        status: 200,
      };

      const response = await request(server)
        .get("/heartbeat")
        .set("Accept", "application/json");

      expect(response.body).toStrictEqual(expectedResponse);
    });
  });
});
