# File: sveltekit-app/Dockerfile
# Simplified for local development using PNPM

# 1. Start from a base image
FROM node:24-alpine

# 2. Install essential tools, including bash
RUN apk add --no-cache bash git

# 3. Install and configure pnpm
RUN npm install -g pnpm

# 4. Set the working directory
WORKDIR /app

# 5. Copy dependency manifests
COPY package.json pnpm-lock.yaml* ./

# 6. Install dependencies
RUN pnpm install

# 7. Copy the rest of your code
COPY . .

# 8. Expose the application port
EXPOSE 5173

# 9. Define the default command
CMD [ "pnpm", "run", "dev", "--host" ]