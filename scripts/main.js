import { system, world, BlockLocation } from '@minecraft/server';
import { SCHEDULED_TICKS } from './config/config';
const DIMENSION_LIST = ['minecraft:overworld','minecraft:nether','minecraft:the_end'];

system.runSchedule(() => {
    for (let index = 0;index < DIMENSION_LIST.length;index++) {
        const dimension = world.getDimension(DIMENSION_LIST[index]);
        for (const entity of dimension.getEntities()) {
            try {
                const blockLocation = new BlockLocation(Math.floor(entity.location.x),Math.floor(entity.location.y),Math.floor(entity.location.z));
                const blockStandingIn = dimension.getBlock(blockLocation);
                if (blockStandingIn?.typeId === 'minecraft:campfire' || blockStandingIn?.typeId === 'minecraft:soul_campfire') {
                    entity.setOnFire(8);
                }
            } catch {}
        }
    }
},SCHEDULED_TICKS);