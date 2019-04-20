
exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects",tbl =>{
   tbl.increments();//itwill increase id field byitself
    tbl.string("project_name",128).notNullable();

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects")
};


  
