import React, { Dispatch, SetStateAction } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import { MuiStyles, OperationPost } from "src/utils/interfaces";
import Panel, { PanelSubtitle, PanelTitle } from "src/components/general/Panel";
import Select from "src/components/general/Select";
import Checkbox from "src/components/general/Checkbox";
import { OperationPostTypes } from "server/db/post/model";
import { firstLetterUppercase } from "src/utils/helpers/strings";
import Radio from "src/components/general/Radio";
import { sortObjectArrayByDate } from "src/utils/helpers/dates";

import { PostTypeToColor } from "./timeline/post/post-type-indicator";

const styles = () =>
    createStyles({
        sortSelect: {
            margin: "10px 0 20px",
        },
        checkboxSectionWrapper: {
            marginLeft: 28,
            display: "flex",
            flexDirection: "column",
        },
        postTypeCheckboxColor: {
            width: 12,
            height: 12,
            borderRadius: "50%",
            marginRight: 8,
        },
        filterTitle: {
            marginTop: 15,
        },
    });

export enum SortOptions {
    WrittenDesc = "Date Written: Newest First",
    WrittenAsc = "Date Written: Oldest First",
    HappenedDesc = "Date Happened: Newest First",
    HappenedAsc = "Date Happened: Oldest First",
}

export const SortOptionsToFunction: Record<SortOptions, (posts: OperationPost[]) => OperationPost[]> = {
    [SortOptions.WrittenAsc]: (posts) => sortObjectArrayByDate<OperationPost>(posts, "writtenAt"),
    [SortOptions.HappenedAsc]: (posts) => sortObjectArrayByDate<OperationPost>(posts, "happenedAt"),
    [SortOptions.WrittenDesc]: (posts) => sortObjectArrayByDate<OperationPost>(posts, "writtenAt", "desc"),
    [SortOptions.HappenedDesc]: (posts) => sortObjectArrayByDate<OperationPost>(posts, "happenedAt", "desc"),
};

export enum PostTypeFilterRadioOptions {
    ALL = "all",
    CUSTOM = "custom",
}

type SortFilterPanelProps = MuiStyles & {
    className: string;
    sortState: [SortOptions, Dispatch<SetStateAction<SortOptions>>];
    postTypeFiltersState: [OperationPostTypes[] | null, Dispatch<SetStateAction<OperationPostTypes[] | null>>];
};
function SortFilterPanel(props: SortFilterPanelProps) {
    const { classes, className, sortState, postTypeFiltersState } = props;
    const [currentSort, setSort] = sortState;
    const [postTypeFilters, setPostTypeFilters] = postTypeFiltersState;

    function onChangePostTypeFilterRadio(e: React.ChangeEvent<HTMLInputElement>) {
        setPostTypeFilters(JSON.parse(e.target.value));
    }

    function togglePostTypeFilter(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;

        // should not happen, but just so TS will shut up
        if (!postTypeFilters) return;

        if (postTypeFilters.includes(value as OperationPostTypes)) setPostTypeFilters(postTypeFilters.filter((p) => p !== value));
        else setPostTypeFilters([...postTypeFilters, value as OperationPostTypes]);
    }

    return (
        <Panel className={className}>
            <PanelTitle>Sort</PanelTitle>
            <Select
                className={classes.sortSelect}
                value={currentSort}
                selectionList={Object.values(SortOptions).map((s: string) => ({ label: s, value: s }))}
                variant="filled"
                onChange={(e) => setSort(e.target.value as SortOptions)}
            />
            <PanelTitle className={classes.filterTitle}>Filter</PanelTitle>
            <PanelSubtitle>By Post Type</PanelSubtitle>
            <Radio
                value={"null"}
                checked={!postTypeFilters}
                label={firstLetterUppercase(PostTypeFilterRadioOptions.ALL)}
                onChange={onChangePostTypeFilterRadio}
            />
            <Radio
                value={JSON.stringify(Object.values(OperationPostTypes))}
                checked={Array.isArray(postTypeFilters)}
                label={firstLetterUppercase(PostTypeFilterRadioOptions.CUSTOM)}
                onChange={onChangePostTypeFilterRadio}
            />
            <div className={classes.checkboxSectionWrapper}>
                {Object.values(OperationPostTypes).map((postType: OperationPostTypes) => (
                    <Checkbox
                        value={postType}
                        checked={!postTypeFilters || postTypeFilters.includes(postType)}
                        disabled={!postTypeFilters}
                        key={postType}
                        label={
                            <span>
                                <Box className={classes.postTypeCheckboxColor} bgcolor={PostTypeToColor[postType]} display="inline-block" />
                                <i>{firstLetterUppercase(postType)}</i>
                            </span>
                        }
                        onChange={togglePostTypeFilter}
                    />
                ))}
            </div>
        </Panel>
    );
}

export default withStyles(styles)(SortFilterPanel);
