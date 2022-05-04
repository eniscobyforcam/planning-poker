FROM alpine:latest

COPY planning-poker-api/bin/planning-poker-api /opt/planning-poker-api
COPY planning-poker-ui/build /opt/static

EXPOSE 80

ENTRYPOINT /opt/planning-poker-api --port 80 --httpRoot /opt/static