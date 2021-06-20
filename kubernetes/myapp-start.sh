#!/bin/bash
kubectl apply -f myredis/myredis-configMap.yaml;
kubectl apply -f myredis/myredis-deployment.yaml;
kubectl apply -f myredis/myredis-cluster-ip-service.yaml;

kubectl apply -f myapp-pv.yaml;

kubectl apply -f mypostgres/mypostgres-secret.yaml;
kubectl apply -f mypostgres/mypostgres-configMap.yaml;
kubectl apply -f mypostgres/mypostgres-pvc.yaml;
kubectl apply -f mypostgres/mypostgres-deployment.yaml;
kubectl apply -f mypostgres/mypostgres-cluster-ip-service.yaml;

kubectl apply -f mybackend/mybackend-configMap.yaml;
kubectl apply -f mybackend/mybackend-deployment.yaml;
kubectl apply -f mybackend/mybackend-cluster-ip-service.yaml;

kubectl apply -f myfrontend/myfrontend-deployment.yaml;
kubectl apply -f myfrontend/myfrontend-cluster-ip-service.yaml;

kubectl apply -f myapp-ingress.yaml;