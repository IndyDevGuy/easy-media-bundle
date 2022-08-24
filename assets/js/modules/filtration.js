export default {
    methods: {
        // setters
        setFilterName(val) {
            if (val == 'non') {
                return this.resetInput('filterName')
            } else if (!this.filterNameIs(val) && this.haveAFileOfType(val)) {
                this.filterName = val
            }
        },
        setSortName(val) {
            if (val == 'non') {
                return this.resetInput('sortName')
            } else if (!this.sortNameIs(val)) {
                this.sortName = val
            }
        },

        // helper
        haveAFileOfType(val) {
            if (val == 'selected') {
                return Boolean(this.bulkItemsCount)
            } else {
                return this.files.items.some((item) => this.fileTypeIs(item, val))
            }
        },
        filterNameIs(val) {
            return this.filterName == val
        },
        sortNameIs(val) {
            return this.sortName == val
        },

        // filter
        showFilesOfType(val) {
            let files = this.files.items

            switch (val) {
                case 'selected':
                    this.filterdFilesList = this.bulkList
                    break
                case 'text':
                    this.filterdFilesList = files.filter((item) => this.fileTypeIs(item, 'text') || this.fileTypeIs(item, 'pdf'))
                    break
                case 'application':
                    this.filterdFilesList = files.filter((item) => this.fileTypeIs(item, 'application') || this.fileTypeIs(item, 'compressed'))
                    break
                default:
                    this.filterdFilesList = files.filter((item) => this.fileTypeIs(item, val))
                    break
            }

            if (!this.isBulkSelecting()) {
                this.resetInput(['selectedFile', 'currentFileIndex'])
                this.selectFirst()
            }

            if (this.searchFor) {
                this.updateSearchCount()
            }
        },
        fileTypeIs(item, val) {
            let mimes = this.config.mimeTypes
            let type = item?.type
            if(val.includes('/*')){
                val = val.split('/')
                val = val[0];
            }

            if (type) {
                if (val == 'image' && mimes.image.includes(type)) {
                    return true
                }

                // because "oembed" shows up as "application"
                if ((type && type.includes('oembed')) && val != 'oembed') {
                    return false
                }

                // because "pdf" shows up as "application"
                if ((type && type.includes('pdf')) && val != 'pdf') {
                    return false
                }

                // because "archive" shows up as "application"
                if ((type && type.includes('compressed')) || mimes.archive.includes(type)) {
                    return val == 'compressed' ? true : false
                }

                return type && type.includes(val)
            }
        },

        // search
        updateSearchCount() {
            this.$nextTick(() => {
                this.searchItemsCount = this.filesList.length

                this.$nextTick(() => {
                    if (this.searchItemsCount == 0) {
                        this.resetInput(['selectedFile', 'currentFileIndex'])

                        !this.no_search
                            ? this.noSearch('show')
                            : false
                    } else {
                        this.selectFirstInBulkList()

                        this.no_search
                            ? this.noSearch('hide')
                            : false
                    }
                })
            })
        }
    }
}
