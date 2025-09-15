# Automation Engineer – Hiring Challenge

We're delighted about your interest in joining our team as an **Automation Engineer**.

For us to assess your current knowledge and skills, we invite you to solve **one of the two tasks** outlined below.

You'll work with the Laravel + React app in this repository. It is a simple web app which lets the user create an order and which can check domain settings. The tech stack resembles what we currently use in our team, so you'll see what you could be working with.

We do encourage you to use AI automation to help solve this task. However, please note that we will review the submissions carefully. After all, it is your skills that we evaluate.

## Task 1: Order Automation (Playwright)

### Task Description

1. Browse to https://automation-hiring-challenge.fly.dev/.

1. You'll see an order form. Try creating an order manually to get a feel for it.

1. Your task: creating Playwright code for automatically submitting an order. You will find a skeleton at
   [`tests/E2E/tests/order.spec.ts`](tests/E2E/tests/order.spec.ts).

    Notes:
    - There are some obstacles with the "buy domains" field. The "bring domains" field is easier. Work on the other fields first.
    - You should `console.log` the Order ID when the order has been successfully created.
    - You can use the deployment at fly.io or run `composer dev` locally.

### Grading

- [ ] You sucessfully created an order.
- [ ] You filled in the "buy domains" field.
- [ ] Your code is structured logically and uses modularization (functions, classes, etc.) where appropriate

## Task 2: Domain Check (Laravel)

### Task Description

1. See the [`UserDomain`](app/Models/UserDomain.php) model and [its seeder](database/seeders/UserDomainSeeder.php). Initialize your local SQLite database and run the seeder.

1. Your task is implementing the logic for the [CheckDomains](app/Console/Commands/CheckDomains.php) task:

    Iterate over all domains and check:
    1. When you connect to `https://domain.com`, that it redirects (_Location_ header) to `redirect_url`.

    1. When you retrieve the DNS MX records for `domain.com`, that they match the specification in the `mx` column.

    1. When the Redirect URL check is successful, set `redirect_verified_at` to the current time. If it fails, set it to _NULL_. Same for MX.

    Hints:
    - Implement proper logging. Add an optional `--debug` flag (when debug is on: print the headers and DNS records that you retrieve).

    - You shouldn't need to use many (or any) new libraries for this task. Keep it simple.

### Grading

- [ ] `php artisan app:check-domains` completes successfully
- [ ] Redirects are successfully checked
- [ ] DNS MX records are successfully checked

## Submission

Fork this repository and create a PR in your fork. Send us the link to your PR.

## Technical Notes

### Local Setup

Prerequisites:

- PHP 8.2+
- Node.js and npm
- Composer

1. Clone the repository and install dependencies:

    ```bash
    composer install
    npm install
    ```

2. Set up environment:

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

3. Initialize SQLite database:

    ```bash
    php artisan migrate --seed
    ```

4. Run development server step by step:

    ```bash
    php artisan ser
    npm run dev
    ```

5. For Playwright E2E tests:

    ```bash
    cd tests/E2E
    npm install
    npx playwright install
    ```

6. Testing:
   ```bash
   cd tests/E2E
   npx playwright test
    ```

### Laravel Sail (Docker)

Alternative setup using Laravel Sail:

1. Install dependencies and start containers:

    ```bash
    composer install
    ./vendor/bin/sail up -d
    ```

2. Run migrations and seeders:

    ```bash
    ./vendor/bin/sail artisan migrate --seed
    ```

3. Install frontend dependencies:
    ```bash
    ./vendor/bin/sail npm install
    ./vendor/bin/sail npm run dev
    ```
