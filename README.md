# 📦 CEP Validation API

---

## 📋 Table of Contents

1. 🚀 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 💾 [Environment Variables](#environment-variables)
5. 💻 [Quick Start](#quick-start)
6. 🤝 [Contributing](#contributing)
7. 👥 [Authors](#authors)

---

## <a name="introduction">🚀 Introduction</a>

CEP Validation API is a RESTful service that allows users to validate Brazilian ZIP codes (CEPs) by querying external services. The API follows Clean Architecture principles to ensure maintainability and scalability.

---

## <a name="tech-stack">⚙️ Tech Stack</a>

- **Node.js** - Runtime for JavaScript
- **TypeScript** - Strongly typed JavaScript
- **Express.js** - Fast and lightweight web framework
- **Prisma** - ORM for database access
- **Axios** - HTTP client for making external API requests
- **Zod** - Schema validation library
- **Docker** - Containerization for easy deployment
- **Jest** - Testing framework

---

## <a name="features">🔋 Features</a>

- **CEP Validation**: Query and validate Brazilian ZIP codes.
- **RESTful API**: Follows REST principles for resource management.
- **Clean Architecture**: Modular and scalable codebase.
- **Database Integration**: Uses Prisma for data persistence.
- **Environment Configurable**: Uses `.env` files for configuration.
- **Testing Suite**: Includes unit and integration tests with Jest and Supertest.

---

## <a name="envs">💾 Environment Variables</a>

Create a `.env` file in the project root and configure the following variables:

```ini
# Database Connection
DATABASE_URL=

```

For reference, see `.env.example` in the repository.

---

## <a name="quick-start">💻 Quick Start</a>

### 1️⃣ Prerequisites

Ensure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)
- [Prisma](https://www.prisma.io/)

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/souz-dev/cep-validation-api
cd cep-validation-api
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Set Up Environment Variables

Create a `.env` file and fill in the required variables.

### 5️⃣ Run with Docker

Ensure Docker is installed and running:

```bash
docker-compose up --build
```

### 6️⃣ Configuring Prisma

Apply the migrations to the database:

```bash
npx prisma migrate dev
```

### 7️⃣ Run the Project Locally

To run the application in development mode:

```bash
npm run dev
```


### 8️⃣ Run Tests

Run unit and integration tests:

```bash
npm test
```

---
 <a name="contributing">🤝 Contributing</a>

Contributions, issues, and feature requests are welcome!

1. Fork it (<https://github.com/souz-dev/cep-validation-api>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## <a name="authors">👥 Authors</a>

<table style="border-collapse: collapse; table-layout: auto text-align: left;">

  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;">
        <img src="https://avatars.githubusercontent.com/u/72813560?s=400&u=8d8a139a3376a866a0c901dbba3428a876d79b60&v=4" width="60" style="border-radius: 50%; display: block; margin: 0 auto;">
      </td>
      <td style="padding: 10px; border: 1px solid #ddd;">Hiago Souza</td>
      <td style="padding: 10px; border: 1px solid #ddd;">
        <a href="https://www.linkedin.com/in/souz-dev/" target="_blank">LinkedIn</a> |
        <a href="https://github.com/souz-dev" target="_blank">GitHub</a>
      </td>
    </tr>
  </tbody>
</table>


### 🚀 Happy Coding! 🎉

