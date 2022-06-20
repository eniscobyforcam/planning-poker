# When building docker images under windows, the best way is to compile in a linux container.
# When working under Linux, we could just copy the statically linked binary from our development environment into the container.
FROM golang:1.18-alpine as build

ENV CGO_ENABLED=0
ENV GOOS=linux
ENV GOARCH=amd64

WORKDIR /go/src/github.com/eniscobyforcam/planning-poker-api

COPY ./planning-poker-api/ ./

RUN go mod vendor && \
    go build -o bin/planning-poker-api pkg/cmd/main.go

# This is where our production image starts
FROM alpine:latest
RUN apk --no-cache add ca-certificates

# get go binary from previous build stage
COPY --from=build /go/src/github.com/eniscobyforcam/planning-poker-api/bin/planning-poker-api /opt/planning-poker-api
# get previously build ui app from corresponding folder
COPY planning-poker-ui/build/ /opt/static/

EXPOSE 80

CMD /opt/planning-poker-api --port 80 --httpRoot /opt/static