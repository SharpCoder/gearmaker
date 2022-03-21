# Lambda

## To login to aws

```bash
aws ecr get-login-password --region us-west-2 | sudo docker login --username AWS --password-stdin 996737042245.dkr.ecr.us-west-2.amazonaws.com
```

## To Build

```bash
sudo ./deploy.sh
```