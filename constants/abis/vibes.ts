import { Interface } from '@ethersproject/abi'

import VIBES_WELLSPRING_ABI from './vibes_wellspring.json'

const VIBES_INTERFACE = new Interface(VIBES_WELLSPRING_ABI)

export default VIBES_INTERFACE
export { VIBES_WELLSPRING_ABI }
