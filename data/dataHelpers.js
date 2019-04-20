const knex = require("knex");
const dbConfig = require("../knexfile.js");
const db = knex(dbConfig.development);

module.exports = {
  find,
  findBy,
  insert,
  remove,
  update,
  truncate
};

function find() {
  return db("FancyProjects");
}

function findBy(id) {
  return db("FancyProjects").where({ id });
}

async function insert(project) {
  //return db("FancyProjects").insert(project);
  const [id] = await db("FancyProjects").insert(project);
  return db("FancyProjects")
    .where({ id })
    .first();
}
function update(id, changes) {
  return db("FancyProjects")
    .where({ id })
    .update(changes);
}
function remove(id) {
  console.log("ID : ", id);
  return db("FancyProjects")
    .where("id", id)
    .del();
}

function truncate() {
  return db("FancyProjects").truncate();
}

// async function add(project){
//   const [id] =await db('projects').insert(project)
//   return findBy({id})
//   .first()
// }
