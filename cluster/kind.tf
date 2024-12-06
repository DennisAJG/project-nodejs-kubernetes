terraform {
  required_providers {
    null = {
      source  = "hashicorp/null"
      version = "3.2.1"
    }
  }
}

provider "null" {}

resource "null_resource" "create_kind_cluster" {
  provisioner "local-exec" {
    command = <<EOT
      kind create cluster --name kind --config=config.yaml
    EOT
  }
}

resource "null_resource" "metallb_setup" {
  depends_on = [null_resource.create_kind_cluster]

  provisioner "local-exec" {
    command = <<EOT
      kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.14.8/config/manifests/metallb-native.yaml
      kubectl wait --namespace metallb-system --for=condition=ready pod --selector=app=metallb --timeout=90s
      kubectl apply -f manifests/
    EOT
  }
}

resource "null_resource" "apply_helmfile" {
  depends_on = [null_resource.metallb_setup]

  provisioner "local-exec" {
    command = "helmfile apply"
  }
}

output "kubeconfig" {
  value = "Cluster KIND criado e configurado com MetalLB e Helmfile aplicado!"
}