const server = require("./server.js");
const request = require("supertest");

const dbHelper = require("./data/dataHelpers.js");
beforeEach(() => {
  return dbHelper.truncate();
});

describe("the server", () => {
  it("it should start testing enviornment", () => {
    const env = process.env.DB_ENV;
    expect(env).toBe("testing");
  });

  it("its should return status 200", () => {
    return request(server)
      .get("/") //request is for the supertest
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

  describe("GET/", () => {
    it("its should return status 200 in async way", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
  });

  it("it should return JSON", async () => {
    const res = await request(server).get("/");
    expect(res.type).toBe("application/json");
  });

  xit("should return {api:'up'}", async () => {
    const res = request(server).get("/");
    expect(res.body).toEqual({ api: "up" });
  });

  describe("The insert function", () => {
    beforeEach(() => {
      return dbHelper.truncate();
    });

    it("it should insert a project in the database", async () => {
      //console.log("Insert...");
      const id = await dbHelper.insert({ project_name: "hello2" });

      //console.log("Inserted...", id);
      const project = await dbHelper.find();

      expect(project.length).toBe(1);
      expect(project[0].project_name).toBe("hello2");
    });

    it("should return the inserted project with id", async () => {
      const project = await dbHelper.insert({ project_name: "pickle" });
      //console.log("project is", project);
      expect(project.project_name).toBe("pickle");
      expect(project.id).toBe(1);
    });

    it("should give GET All", async () => {
      console.log("should give GET All");
      const projects = await dbHelper.insert({ project_name: "lime" });

      const projects2 = await dbHelper.insert({ project_name: "lemon" });
      const projects3 = await dbHelper.find();
      //console.log("projects", projects);
      console.log("here are the projects", projects3);
      expect(projects3.length).toBe(2);
    });
  });

  //Insert returns whole project object
  it("should delete the inserted project", async () => {
    const project = await dbHelper.insert({ project_name: "divine" });
    console.log("Project : ", project);

    await dbHelper.remove(project.id);
    const project2 = await dbHelper.findBy(project.id);

    expect(project2.length).toBe(0);
  });
  it(",should return an empty array",async()=>{
    const project = await dbHelper.insert({ project_name: "lime" });
    const project2 = await dbHelper.insert({ project_name: "lemon" });
    
    await dbHelper.remove(project.id);
    
    const tmp = await dbHelper.findBy(project2.id);
    expect(tmp.length).toBe(1);

  })
});
