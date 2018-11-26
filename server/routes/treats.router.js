const router = require('express').Router();
const pool = require('../modules/pool');


// GET /treats
router.get( '/', ( req, res ) => {
    // if user entered something to filter or search by
    if( req.query.q ){
        let queryString = `SELECT * FROM "treats"
        WHERE "name" ILIKE ('%' || $1 || '%');`;
        pool.query(queryString, [req.query.q])
            .then(result => {
                res.send(result.rows);
            }).catch(err => {
                console.log('error in GET query:', err);
                res.sendStatus(500);
            });
    }
    // if nothing was entered to search by
    else{ 
        let queryString = `SELECT * FROM "treats" ORDER BY "id" ASC;`;
        pool.query(queryString )
            .then(result => {
                res.send(result.rows);
            }).catch(err => {
                console.log('error in GET query:', err);
                res.sendStatus(500);
            });
    }
}) // end GET route

// POST /treats
router.post( '/', ( req, res ) => {
    let queryString = `INSERT INTO "treats" ("name", "description","pic")
    VALUES ($1, $2, $3);`;
    console.log(req.body);
    pool.query( queryString, [ req.body.name, req.body.description, req.body.pic ] )
    .then( result => {
        res.sendStatus( 201 );
    }).catch( err => {
        console.log( 'error in POST query:', err );
        res.sendStatus( 500 );
    }); // end query
}); // end POST route
// PUT /treats/<id>
router.put( '/:id', ( req, res ) => {
    let id = req.params.id;
    let queryString = `UPDATE "treats" SET "description" = $1
    WHERE "id" = $2;`;
    pool.query( queryString, [ req.body.description, id ] )
    .then( result => {
        res.sendStatus( 201 );
    }).catch( err => {
        console.log( 'there was an error in put route:', err );
        res.sendStatus( 500 );
    });//end query
});// end PUT route

// DELETE /treats/<id>
router.delete( '/:id', ( req, res ) => {
    let id = req.params.id;
    let queryString = `DELETE FROM "treats" WHERE "id" = $1;`;
    pool.query( queryString, [ id ] )
    .then( result => {
        res.sendStatus( 200 );
    }).catch( err => {
        console.log( 'there was an error in delete route:', err );
        res.sendStatus( 500 );
    });// end query
});// end DELETE route

module.exports = router;
