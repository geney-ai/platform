terraform { 
  cloud { 
    # TODO (replace with your own organization)
    organization = "krondor-corp" 

    workspaces { 
      name = "container-registry" 
    } 
  } 
}