const fs = require('fs')
const path = require('path')
const registry = require('package-stream')()
const count = require('count-array-values')
const licenses = []

registry
  .on('package', function (pkg, seq) {
    licenses.push(pkg.license)
    process.stdout.write('.')

    // for debugging with a subset of all packages
    // if (licenses.length > 100000) finish()
  })
  .on('up-to-date', function () {
    finish()
  })

function finish () {
  fs.writeFileSync(
    path.join(__dirname, 'results.json'),
    JSON.stringify(count(licenses), null, 2)
  )
  process.exit()
}