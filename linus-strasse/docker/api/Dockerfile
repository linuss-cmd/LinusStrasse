# Build stage
FROM golang:1.25-alpine AS builder

WORKDIR /build

COPY services/api/go.mod services/api/go.sum ./
RUN go mod download

COPY services/api/ .
RUN CGO_ENABLED=0 go build -o api .

# Runtime stage
FROM alpine:3.19

RUN apk add --no-cache ca-certificates

WORKDIR /app

COPY --from=builder /build/api ./api

ENV PORT=8080

EXPOSE 8080

CMD ["./api"]
