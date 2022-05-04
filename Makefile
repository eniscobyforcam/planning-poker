all: clean build_api build_ui build_docker

.PHONY: clean_ui clean_api clean docker_up docker_down build_docker

docker_up:
	docker run -d --name planning-poker -p 8080:80 planning-poker:latest

docker_down:
	docker rm -f planning-poker

build_docker:
	docker build --rm --tag planning-poker .

build_api:
	cd planning-poker-api && go mod vendor && go build -ldflags "-linkmode external -extldflags -static" -a -o bin/planning-poker-api pkg/cmd/main.go

build_ui:
	cd planning-poker-ui && yarn && yarn build

clean_ui:
	-rm -rf planning-poker-ui/node_modules
	-rm -rf planning-poker-ui/build

clean_api:
	-rm -rf planning-poker-api/bin

clean: clean_ui clean_api
