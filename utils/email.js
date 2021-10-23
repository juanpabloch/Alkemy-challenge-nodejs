const html = (userName)=>{
  return `
  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          padding: 20px;
          background-color: #cae5f3;
          font-weight: 400;
        }
        header {
          text-align: center;
          margin-bottom: 70px;
        }
        h1 {
          font-size: 3rem;
          font-weight: 400;
        }
        header h3 {
          max-width: 600px;
          margin: 0 auto;
          font-size: 1.5rem;
          font-weight: 400;
        }
        section {
          max-width: 1000px;
          margin: 10px auto;
          margin-bottom: 50px;
        }
        .request {
          font-weight: 600;
        }
        .green {
          color: #14a76c;
        }
        .yellow {
          color: #f8e9a1;
          text-shadow: 0px 0px 2px rgb(146, 146, 146);
        }
        .red {
          color: #f76c6c;
        }
        .blue {
          color: #24305e;
        }
        footer {
          text-align: center;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>Hello ${userName}! and Welcome to Explore-Disney API</h1>
        <h3>
          This API will allow knowing and modifying the characters that compose it
          and understanding in which films they participated
        </h3>
      </header>
  
      <section>
        <h3>How to start with the API</h3>
        <p>
          First you must log in to obtain a <span>TOKEN</span> which is necessary
          to interact with the API, this TOKEN must be placed in the header with
          the key: Authorization
        </p>
  
        <article>
          <h2>/characters</h2>
          <p>
            <span class="request green">GET</span> “ /characters ” <br />
            Returns 200: [ { image, name }, ... ]
          </p>
  
          <p>
            <span class="request green">GET</span> “ /characters/:id ” <br />
            Returns 200: { image, name, age, weight, history, movies or series
            associated } <br />
          </p>
  
          <p>
            <span class="request yellow">POST</span> “ /characters ” <br />
            receives: { image, name, age, weight, history } <br />
            Returns 201: { image, name, age, weight, history }
          </p>
  
          <p>
            <span class="request red">DELETE</span> “ /characters/:id ” <br />
            Returns 200: { message: “character successfully removed” }
          </p>
  
          <p>
            <span class="request blue">PUT</span> “ /characters/:id ” (image,
            name, age, weight, history, movies) <br />
            Returns 201: { image, name, age, weight, history } <br />
          </p>
  
          <p>
            <span class="request blue">PUT</span>
            “/characters/:idCharacter/movies/:idMovie” (relation many to many)
            <br />
  
            Returns 200: { image, name, age, weight, history, movies or series
            associated } <br />
          </p>
  
          <p>Filters</p>
  
          <p>
            <span class="request green">GET</span> “/characters/?name=name” <br />
            Returns 200: [ { image, name }, ... ]
          </p>
  
          <p>
            <span class="request green">GET</span> “/characters/?age=age” <br />
            Returns 200: [ { image, name }, ... ]
          </p>
  
          <p>
            <span class="request green">GET</span> “/characters/?movies=idMovie”
            <br />
            Returns 200: [ { image, name }, ... ]
          </p>
        </article>
  
        <hr />
  
        <article>
          <h2>/movies</h2>
          <p>
            <span class="request green">GET</span> “ /movies ” <br />
            Returns 200: [ { image, title, date of release }, ... ]
          </p>
          <p>
            <span class="request green">GET</span> “ /movies/:id ” <br />
            Returns 200: { image, title, rate, genre, date of release, characters
            associated } <br />
          </p>
          <p>
            <span class="request yellow">POST</span> “ /movies ” <br />
            receives: { image, title, rate, genre, date of release } <br />
            Returns 201: { image, title, rate, genre, date of release }
          </p>
          <p>
            <span class="request red">DELETE</span> “ /movies/:id ” <br />
            Returns 200: { message: “movie successfully removed” }
          </p>
          <p>
            <span class="request blue">PUT</span> “ /movies/:id ” (image, title,
            age, genre, date of release, movies) <br />
            Returns 201: { image, title, rate, genre, date of release } <br />
          </p>
          
          <p>
            <span class="request blue">PUT</span>
            “/:idMovie/characters/:idCharacter” (relation many to many) <br />
            Returns 200: { image, title, rate, genre, date of release, characters
            associated } <br />
          </p>
  
          <p>Filters</p>
          <p>
            <span class="request green">GET</span> “/movies/?title= title” <br />
            Returns 200: [ { image, title }, ... ]
          </p>
          <p>
            <span class="request green">GET</span> “/movies/?genre= genreId”
            <br />
            Returns 200: [ { image, title }, ... ]
          </p>
  
          <p>
            <span class="request green">GET</span> “/movies/?order= ASC | DESC”
            <br />
            Returns 200: [ { image, title }, ... ]
          </p>
        </article>
  
        <hr />
  
        <article>
          <h2>/genre</h2>
          <p>
            <span class="request green">GET</span> “ /genre ” <br />
            Returns 200: [ { image, name }, ... ]
          </p>
  
          <p>
            <span class="request green">GET</span> “ /genre/:id ” <br />
            Returns 200: { image, name, movies or series associated } <br />
          </p>
  
          <p>
            <span class="request yellow">POST</span> “ /genre ” <br />
            receives: { image, name } <br />
            Returns 201: { image, name }
          </p>
  
          <p>
            <span class="request red">DELETE</span> “ /genre/:id ” <br />
            Returns 200: { message: “genre successfully removed” }
          </p>
  
          <p>
            <span class="request blue">PUT</span> “ /genre/:id ” (image, name )
            <br />
            Returns 201: { image, name } <br />
          </p>
  
          <p>
            <span class="request blue">PUT</span>
            “/:idMovie/characters/:idCharacter” (relation many to many) <br />
            Returns 200: { image, name, movies or series associated } <br />
          </p>
  
          <p>Filters</p>
  
          <p>
            <span class="request green">GET</span> “/genre/?name= name” <br />
            Returns 200: [ { image, name }, ... ]
          </p>
        </article>
      </section>
  
      <footer>
        <h4>hope you enjoy this API and make the best web page</h4>
        <p>Choternasty Juan Pablo</p>
      </footer>
    </body>
  </html>
  `
}

module.exports = html