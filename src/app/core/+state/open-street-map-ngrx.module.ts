import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { OpenStreetMapEffects } from "./open-street-map.effect";
import { StoreModule } from "@ngrx/store";
import { openStreetMapFeature } from "./open-street-map.reducer";

@NgModule({
    imports: [
        EffectsModule.forFeature([OpenStreetMapEffects]),
        StoreModule.forFeature(openStreetMapFeature),
    ]
})
export class OpenStreetMapNgrxModule {}