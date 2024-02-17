# Use the official Deno image
FROM denoland/deno:1.38.4

# The port that your application listens to.
EXPOSE 8087

WORKDIR /app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally, cache deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache deps.ts

# Download oak_cors module
RUN deno --unstable run --allow-write=https://deno.land/x/oak_cors/ https://deno.land/x/oak_cors/mod.ts

# These steps will be re-run upon each file change in your working directory:
COPY . .

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--unstable", "main.ts"]
