# Bun + native deps (e.g. sharp) on Ubuntu 24.04 — used by GitHub Codespaces and local Dev Containers.
FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

ARG BUN_VERSION=1.3.14
ENV BUN_INSTALL=/usr/local/bun
ENV PATH="${BUN_INSTALL}/bin:${PATH}"

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get install -y --no-install-recommends \
    build-essential \
    ca-certificates \
    curl \
    git \
    unzip \
  && curl -fsSL https://bun.sh/install | bash -s "bun-v${BUN_VERSION}" \
  && ln -sf "${BUN_INSTALL}/bin/bun" /usr/local/bin/bun \
  && ln -sf "${BUN_INSTALL}/bin/bunx" /usr/local/bin/bunx \
  && apt-get autoremove -y \
  && rm -rf /var/lib/apt/lists/*
