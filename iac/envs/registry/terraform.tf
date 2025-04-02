terraform {
  backend "s3" {
    endpoint                    = "nyc3.digitaloceanspaces.com"
    bucket                     = "terraform-state"
    key                        = "registry/terraform.tfstate"
    region                     = "us-east-1"  # Required for DO Spaces
    skip_credentials_validation = true
    skip_metadata_api_check    = true
    skip_region_validation     = true
    force_path_style           = true
  }
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}
