const { spawn } = require('node:child_process')

// start the `ping google.com` command
setInterval(() => {
  const command = spawn('ping', ['google.com'])

  // the `data` event is fired every time data is
  // output from the command
  command.stdout.on('data', (output) => {
    // the output data is captured and printed in the callback
    console.log('Output: ', output.toString())
  })
  console.log('doe')
}, 10000)
