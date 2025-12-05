import React from 'react';
import { CollapsibleGroup } from '@/components/ui/collapsible-group';
import { ImageInput } from '@/components/CardEditor/ImageInput/ImageInput';
import { TitleInput } from '@/components/CardEditor/TitleInput/TitleInput';

export const GeneralCardInputs: React.FC = () => {
    return (
        <CollapsibleGroup title="General Information" defaultOpen={true}>
            <div className="space-y-4">
                <TitleInput />
                <ImageInput label="Header Image" fieldName="visuals.headerImage" />
                <ImageInput label="Back Cover Image" fieldName="visuals.backImage" />
            </div>
        </CollapsibleGroup>
    );
};
