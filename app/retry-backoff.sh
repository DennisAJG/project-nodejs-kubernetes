#!/bin/bash

apk add curl jq 

# retry backoff parameters
MAX_RETRY=10
COUNT=1
SLEEP=1 # tempo de espera entre uma requisição e outra 


SEVERITY="null" # Iniciado com nulo
HARBOR_URL="http://harbor.localhost.com"
HARBOR_PATH="/api/v2.0/projects/project-liferay/repositories/${JOB_NAME}/artifacts/${TAG}"
HARBOR_URL_PARAMS="with_scan_overview=true"

while [ "$SEVERITY" == "null" ]; do
   SEVERITY=$(curl -X 'GET' \
    "${HARBOR_URL}${HARBOR_PATH}?${HARBOR_URL_PARAMS} \
    -H "accept: application/json" \
    -H "authorization: Basic ${HARBOR_CREDENTIALS}" \
    | jq -r '.scan_overview | to_entries | .[].value.severity" 
    )

    echo "sleep: ${SLEEP}s | count: ${COUNT}"

    sleep $SLEEP
    SLEEP=$(($SLEEP*2))
    COUNT=$(($COUNT+1))
    


    if [ "$COUNT" -ge "$MAX_RETRY" ]; then
        echo "Reached maximum retry of ${MAX_RETRY}, exiting..."
        exit 1
    fi
done

if [ "$SEVERITY" == "critical" ]; then
    echo "There is Critical Sevverity, please check on Harbor for the report"
    exit 1
else 
   echo "All good, proceeding to the next stage"
fi