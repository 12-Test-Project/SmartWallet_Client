# SmartWallet - Client Side

## To work on this project

### Clone the repo
```git
git clone https://github.com/12-Test-Project/SmartWallet_Client
```

<hr />

### Fetch the branch(dev)

```git
git fetch origin dev:dev
```

`This creates and synchronizes the branch(dev) to your local repository`

<hr />

### Make sure you are in the branch(dev) before creating any other branch
```git
git checkout dev
```

<hr />

### Create a branch with your name, if you haven't already

```git
git checkout -b 'example'
```

`replace 'example' with your name`

<hr />

### Make sure to pull and merge the branch(dev) before pushing your branch commits

**Important:** If you find any merge conflicts, please let your teammates know about it so they can help you fix those conflicts.

```git
git checkout dev
git pull origin dev
git checkout 'example'
git merge dev
git push origin 'example'
```

**Replace 'example' with the name of your branch**