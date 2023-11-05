import { system, world } from '@minecraft/server';
import { SCHEDULED_TICKS } from './config/config';

const DIMENSION_LIST = ['minecraft:overworld','minecraft:nether','minecraft:the_end'];
// A lot of entities to exclude which don't need to burn anyways, optimises performance
const NO_BURN_ENTITY_TYPES = [
    'minecraft:item','minecraft:xp_orb', //~ Drops
    'minecraft:arrow','minecraft:dragon_fireball','minecraft:egg','minecraft:ender_pearl','minecraft:evocation_fang','minecraft:eye_of_ender_signal',
    'minecraft:fireball','minecraft:fireworks_rocket','minecraft:fishing_hook','minecraft:lingering_potion','minecraft:llama_spit',
    'minecraft:shulker_bullet','minecraft:small_fireball','minecraft:snowball','minecraft:splash_potion','minecraft:thrown_trident',
    'minecraft:wither_skull','minecraft:wither_skull_dangerous','minecraft:xp_bottle', //~ Projectiles
    'minecraft:agent','minecraft:balloon','minecraft:chalkboard','minecraft:ice_bomb','minecraft:npc','minecraft:tripod_camera', //~ EDU
    'minecraft:falling_block','minecraft:moving_block','minecraft:painting','minecraft:tnt','minecraft:ender_crystal', //~ Blocks
    'minecraft:shield','minecraft:elder_guardian_ghost','minecraft:leash_knot','minecraft:area_effect_cloud' //~ Others
]
const NO_BURN_ENTITY_FAMILIES = ['minecart','lightning']
system.runInterval(() => {
    for (let index = 0;index < DIMENSION_LIST.length;index++) {
        const dimension = world.getDimension(DIMENSION_LIST[index]);
        for (const entity of dimension.getEntities({
            excludeFamilies: NO_BURN_ENTITY_FAMILIES,
            excludeTypes: NO_BURN_ENTITY_TYPES
        })) {
            system.run(() => {
                try {
                    const blockStandingIn = dimension.getBlock(entity.location);
                    if (
                        blockStandingIn?.typeId === 'minecraft:campfire' ||
                        blockStandingIn?.typeId === 'minecraft:soul_campfire'
                    ) {
                        entity.setOnFire(8);
                    }
                } catch {}
            });
        }
    }
},SCHEDULED_TICKS);