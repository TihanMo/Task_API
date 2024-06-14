# Task API

In this repository lies the LBB (exam) for Module 295 of ZLI (Zürcher Lehrbetriebsverband ICT).

The task was to create a Rest-API that handles Tasks. You can find the full API documentation under the endpoint `/api-docs` once you've set up the server.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have read the README.md documentation
* You have installed the latest version of node and npm
* You have a working Browser
* (Optional) You have Postman or any other tool to check if the Endpoints work as expected

## Installing Task API

To install Task API, follow these steps:

```
git clone https://github.com/TihanMo/Task_API
```

```
cd path/to/file/Task_API
```

```
npm i
```

## File Structure

* `/Task_API` This is the project root folder. Here you can also find all the config files and any other files that are needed for the project
  * `/src` This is the source folder of the API. It contains the main implementation of the application, as well as the swagger documentation and Data.
  * `/data`This folder contains all the Task Data in the file `task_data.json`
    * `server.js` This is the main codebase for the API. It contains Routing and User handling etc. 
    * `task-routes.js` This is the router for all `/tasks` routes

## Using Task API

To use Task API, follow these steps:

```
npm run start
```

Open `http://localhost:3000/api-docs` in your browser to see the documentation on all endpoints

## Testing

For Testing a Postman collection is provided to use it, follow these steps:

* Import Task_API.postman_collection.json into Postman
* Start server
* Run the collection

## Additional Scripts

This command runs the code linting for .js files, to check if the code is styled properly
```
npm run eslint
```

This command generates the Swagger Documentation, and is used whenever changes are made to the API
```
npm run swagger
```

This command sets up the developer environment for devs who want to expand the API
```
npm run dev
```

## Contributing to Task API

To contribute to Task API, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Contact

If you want to contact me you can reach me at [tihan.morrol@lernende.bbw.ch](tihan.morrol@lernende.bbw.ch)

## Sources

* README.md file was created with this template [https://github.com/scottydocs/README-template.md](https://github.com/scottydocs/README-template.md)
* Sample Data was generated by [https://chat.openai.com](https://chat.openai.com)

## License

This project uses the following license: GPL-3.0