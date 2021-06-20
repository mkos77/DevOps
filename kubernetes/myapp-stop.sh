#!/bin/bash
kubectl delete ingress myapp-ingress;

kubectl delete deploy myfrontend-deployment mybackend-deployment mypostgres-deployment myredis-deployment;

kubectl delete svc myfrontend-cluster-ip-service mybackend-cluster-ip-service mypostgres-cluster-ip-service myredis-cluster-ip-service;

kubectl delete cm mybackend-configmap mypostgres-configmap myredis-configmap;

kubectl delete secret mypostgres-secret;

kubectl delete pvc mypostgres-pvc;

kubectl delete pv myapp-pv;