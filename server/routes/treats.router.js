const router = require('express').Router();
const pool = require('../modules/pool');


// GET /treats
router.get( '/', ( req, res ) => {
    let queryString = `SELECT * FROM "treats" ORDER BY "id" ASC;`;
    pool.query( queryString )
    .then( result => {
        res.send( result.rows );
    }).catch( err => {
        console.log( 'error in GET query:', err );
        res.sendStatus( 500 );
    }); // end query
}) // end GET route

// POST /treats
router.post( '/', ( req, res ) => {
    let queryString = `INSERT INTO "treats" ("name", "description","pic")
    VALUES ($1, $2, $3);`;
    pool.query( queryString, [ req.body.name, req.body.description, req.body.link ] )
    .then( result => {
        res.sendStatus( 201 );
    }).catch( err => {
        console.log( 'error in POST query:', err );
        res.sendStatus( 500 );
    }) // end query
}) // end POST route
// PUT /treats/<id>

// DELETE /treats/<id>

module.exports = router;
