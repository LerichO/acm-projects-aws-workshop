# ACM Projects' Fall 2024 AWS Workshop Demo

* Download the needed **Iris data set** from UC Irvine's Machine Learning Repository [here](https://archive.ics.uci.edu/dataset/53/iris) and unpack into Jupyter project in AWS SageMaker
* Download the **machine learning model notebook** example [here](https://bit.ly/acm-aws-demo-notebook)
  * Upload into the SageMaker Jupyter
* Copy the **Lambda Function** example below and paste the code into the Lambda function in AWS
  ```
  import json

  import boto3
  import ast
  
  def lambda_handler(event, context):
    
    runtime_client = boto3.client('runtime.sagemaker')
    
    endpoint_name = 'xgboost-2024-10-20-20-12-30-397'
    
    sample = '{},{},{},{}'.format(ast.literal_eval(event['body'])['x1'],
                                ast.literal_eval(event['body'])['x2'],
                                ast.literal_eval(event['body'])['x3'],
                                ast.literal_eval(event['body'])['x4'])
    
    response = runtime_client.invoke_endpoint(EndpointName = endpoint_name,
                                    ContentType = 'text/csv',
                                    Body = sample)
    
    result = int(float(response['Body'].read().decode('ascii')))
    
    print(result)
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'prediction' : result})
    }

  ```

Further information can be found in the tutorial video [here](https://www.youtube.com/watch?v=OfzAl3K0s0U&ab_channel=Computervisionengineer) that this workshop demo is based on
