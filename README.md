# Portal Q Processor Component for Gawati Publishing
- Verify checksum of received zip
- Places path to zip package on ZIP_Q 
- Reads status from STATUS_Q 
- Posts status update to editor-q-processor

### Setup
1. Clone the repo
    ```
    git clone https://github.com/gawati/gawati-portal-qprocessor.git
    ```
2. Install packages
    ```
    npm install
    ```
3. Run
    ```
    node ./bin/www
    ```

### Dependencies
1. This component needs to on the same system as gawati-portal-publisher.
2. It depends on several other components which are a part of the *Publishing Workflow*. The following components need to be started, in the given order, prior to gawati-editor-qprocessor:
    - gawati-data
    - gawati-portal-publisher

### Config
1. Port: The default port is set to 9004.
2. Zip path: This is set in `constants.js` and refers to the filesystem path where zip packages received from gawati-editor-qprocessor are stored. The path to the zip pakackges stored here is written to the ZIP_Q.
3. Service end points: Endpoints for talking to gawati-editor-qprocessor. Set in `configs/dataServer.json`

##### The full documentation of the *Publishing Workflow* is [here]
