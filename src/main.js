import RootGenerator from './generators/root_generator';
import ConfigLoader from './config/config_loader';

const configuration = ConfigLoader.load();
const rootGenerator = new RootGenerator(configuration);
rootGenerator.writeFile();
