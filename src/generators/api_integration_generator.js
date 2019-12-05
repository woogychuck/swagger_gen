import GeneratorBase from './generator_base';

export default class APIIntegrationGenerator extends GeneratorBase {
    constructor(configuration){
        super(configuration);
        this.json = {};
        this.generate(); 
    }

    generate(){
        const apiIntegration = this.configuration.apiIntegration;
        this.json = {
            credentials: apiIntegration.credentials,
            uri: apiIntegration.uri,
            passthroughBehavior: 'when_no_match',
            httpMethod: 'POST',
            type: 'aws_proxy'
        };
    }
}