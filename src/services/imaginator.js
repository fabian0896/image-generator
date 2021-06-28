import fontColorContrast from 'font-color-contrast'
import { fabric } from 'fabric'
import Color from 'color'

import logo_w_SVG from '../SVG/logo-w.svg'
import logo_b_SVG from '../SVG/logo-b.svg'
import whatsappSVG from '../SVG/whatsapp.svg'


export class Imaginator {
    constructor(canvasId,{ width=1140, height=840, visible=true }) {
        this.width = width
        this.height = height
        
        this.logo = {
            '#ffffff': logo_w_SVG,
            '#000000': logo_b_SVG
        }

        const canvasElem = typeof canvasId === 'object' ? canvasId : document.getElementById(canvasId)
        

        const mainContainerElement = document.createElement('div')
        mainContainerElement.style.position = 'relative'
        mainContainerElement.style.width = '100%'
        mainContainerElement.style.paddingBottom = `${(this.height / this.width) * 100}%`
        mainContainerElement.style.background = 'grey'
        mainContainerElement.style.boxShadow = '3px 3px 30px rgba(0,0,0,.3)'
        mainContainerElement.style.borderRadius = '5px'
        mainContainerElement.style.overflow = 'hidden'

        const secondContainerElement = document.createElement('div')
        secondContainerElement.style.position = 'absolute'
        secondContainerElement.style.top = 0
        secondContainerElement.style.bottom = 0
        secondContainerElement.style.left = 0
        secondContainerElement.style.right = 0


        mainContainerElement.appendChild(secondContainerElement)
        canvasElem.replaceWith(mainContainerElement)
        secondContainerElement.appendChild(canvasElem)

        if(!visible){
            mainContainerElement.style.display = 'none'
        }

        const canvas = new fabric.Canvas(canvasId, {
            backgroundColor: '#fff',
            width,
            height
        });
        canvas.selection = false
        canvas.setDimensions({
            width: '100%',
            height: '100%',
        }, {
            cssOnly: true
        })


        this.canvas = canvas
        this.INFO_WIDTH = 320
        this.PADDING = 25
        this.BACKGROUND = '#292926'


        this.productName = ''
        this.ref = ''
        this.price = ''

        this.objects = {}

        this.defaultValues = {}

        this.isInit = false
    }

    setDefaultValues(values){
        Object.keys(values).forEach(value =>{
            this.defaultValues[value] = values[value]
        })
    }

    async init(values) {
        const canvas = this.canvas
        const INFO_WIDTH = values.infoWidth || this.INFO_WIDTH
        const BACKGROUND = values.background || this.BACKGROUND
        const PADDING = values.padding || this.PADDING
        const TEXT_COLOR = fontColorContrast(BACKGROUND)
        this.TEXT_COLOR = TEXT_COLOR

        const {
            productName,
            price,
            ref,
            whatsapp,
        } = values

        this.productName = productName
        this.ref = ref
        this.whatsapp = whatsapp
        this.whatsapp = values.whatsapp ? values.whatsapp : this.whatsapp

        if(typeof price === 'string'){
            this.price = {
                value: price,
                currency: 'COP'
            }
        } else{
            this.price = price
        }

        const infoBackground = new fabric.Rect({
            left: 0,
            top: -0,
            fill: BACKGROUND,
            width: INFO_WIDTH,
            height: canvas.getHeight() + 1,
            selectable: false
        });
        infoBackground.set('id', 'infoBg')
        canvas.add(infoBackground);
        this.objects.infoBgObject = infoBackground


        this.renderDivider()

        


        const companyLogoObject = await this.loadSVG(this.logo[TEXT_COLOR], {
            lockMovementX: true,
            left: PADDING,
            top: PADDING * 2,
            selectable: true
        }, obj => {
            const logoWidth = obj.width
            const containerWidth = infoBackground.width
            const scaleValue = (containerWidth - (PADDING * 2)) / logoWidth
            obj.scale(scaleValue)
        })
        this.objects.companyLogoObject = companyLogoObject
        companyLogoObject.set('id', 'companyLogo')

        await this.renderSocials(whatsapp || this.defaultValues.whatsapp)

        // Textos para hacer referencias y poderlos editat mas adelante
        const priceText = new fabric.Textbox(`${(this.price.currency === 'USD') ? 'USD ' : ''}${this.price.value}`, {
            left: PADDING,
            top: canvas.getHeight() - 300,
            width: INFO_WIDTH - PADDING * 2,
            fontSize: this.price.currency === 'USD'? 51 : 60,
            fontFamily: 'Roboto',
            fill: TEXT_COLOR,
            fontWeight: 400,
            lockMovementX: true
        });
        priceText.set('id', 'price')
        canvas.add(priceText)


        const refrefText = new fabric.Textbox(`${productName}\nRef. ${ref}`, {
            left: PADDING,
            width: INFO_WIDTH - PADDING * 2,
            fontSize: 30,
            fontFamily: 'Roboto',
            fill: TEXT_COLOR,
            fontWeight: 100,
            lockMovementX: true
        });
        refrefText.set('top', priceText.lineCoords.tl.y - refrefText.height - 25)
        refrefText.set('id', 'productNameRef')
        canvas.add(refrefText)




        this.objects = {
            ...this.objects,
            priceObject: priceText,
            productNameRefObject: refrefText,
        }


        this.isInit = true

        return
    }

    async render(values){
        let background = null
        let metalic = false
        if(values.background){
            if(typeof values.background === 'string'){
                metalic = false
                background = values.background
            }else if(typeof values.background === 'object'){
                background = values.background.value
                metalic = values.background.metalic
            }
        }

        if(this.isInit){
            await this.update({
                ...values,
                background
            })
        }else{
            await this.init({
                ...values,
                productName: values.productName || '---',
                ref: values.ref || '---',
                price: values.price || '---',
                background
            })
        }

        if(metalic){
            this.metalicColor(background)
        }
    }

    addImage(file) {
        
        return new Promise(resolve => {
            const url = typeof file === 'string'? file : URL.createObjectURL(file)
            fabric.Image.fromURL(url, image => {
                image.left = this.INFO_WIDTH
                const scaleValue = fabric.util.findScaleToFit(image, this.canvas)
                image.scale(scaleValue)
                image.on('selected', (e)=>{
                    this.onSelectedCallBack && this.onSelectedCallBack(e.target)
                })
                image.on('deselected', (e) => {
                    this.onSelectedCallBack && this.onSelectedCallBack(null)
                })
                this.canvas.setActiveObject(image)
                this.canvas.add(image)
                resolve(image)
            }, {crossOrigin: "anonymous"})
        })
        
        /*
        const image = await this.removeBg(file)
        const url = URL.createObjectURL(image)
        fabric.Image.fromURL(url, oImg => {
            const { height } = oImg.getOriginalSize()
            const canvasHeight = this.canvas.getHeight()
            const scaleValue = canvasHeight / height
            oImg.scale(scaleValue)
            oImg.set('left', this.INFO_WIDTH)
            this.canvas.setActiveObject(oImg)
            this.canvas.add(oImg)
            return
        })
        */
    }

    onSelected(callback){
        this.onSelectedCallBack = callback
    }

    async removeElement(object, deleteFunction){
        const src = object.getSrc()
        const isInMemory = src.startsWith('blob:')
        if(!isInMemory){
            console.log("se va a eliminar la imagen del storage")
            deleteFunction && await deleteFunction(src)
        }
        this.canvas.remove(object)
    }

    loadSVG(url, props, callback) {
        return new Promise(resolve => {
            fabric.loadSVGFromURL(url, (objects, options) => {
                const obj = fabric.util.groupSVGElements(objects, options);
                Object.keys(props).forEach(prop => {
                    obj.set(prop, props[prop])
                })
                callback && callback(obj)
                this.canvas.add(obj)
                resolve(obj)
            })
        })
    }

    async renderSocials(whatsapp) {
        this.objects.whatsappObject && this.canvas.remove(this.objects.whatsappObject)
        this.objects.whatsappLogoObject && this.canvas.remove(this.objects.whatsappLogoObject)
        this.whatsapp = whatsapp
        if (this.whatsapp) {
            const whatsappLogoObject = await this.loadSVG(whatsappSVG, {
                lockMovementX: true,
                left: this.PADDING,
                selectable: false
            }, obj => {
                obj.scale(0.06)
                obj.set('top', this.canvas.getHeight() - obj.getScaledHeight() - (this.PADDING * 1))
            })
            whatsappLogoObject.set('id', 'whatsappLogo')
            whatsappLogoObject.bringToFront()
            const whatsappNumber = new fabric.Textbox(this.whatsapp, {
                left: this.PADDING,
                width: this.INFO_WIDTH - (this.PADDING * 3 + whatsappLogoObject.getScaledWidth()),
                fontSize: 24,
                fontFamily: 'Roboto',
                fill: this.TEXT_COLOR,
                fontWeight: 400,
                lockMovementX: false,
                selectable: false
            });
            whatsappNumber.set('id', 'whatsapp')
            whatsappNumber.bringToFront()
            whatsappNumber.setPositionByOrigin({ x: (this.PADDING * 1.5 + whatsappLogoObject.getScaledWidth()), y: whatsappLogoObject.getCenterPoint().y }, 'left', 'center')
            this.canvas.add(whatsappNumber)
            this.objects.whatsappObject = whatsappNumber
            this.objects.whatsappLogoObject = whatsappLogoObject
        }
        return
    }

    async toJSON(uploadImageFunction) {
        const canvas = this.canvas
        
        if(uploadImageFunction){
            const imageObjects = this.canvas._objects.filter(obj => obj.type === 'image')
            for(let image of imageObjects){
                const imageSource = image.getSrc()
                const isBlob = imageSource.startsWith('blob:')
                if(isBlob){
                    const blob = await fetch(imageSource).then(res => res.blob())
                    URL.revokeObjectURL(imageSource)
                    const newUrl = await uploadImageFunction(blob)
                    await new Promise(resolve => {
                        image.setSrc(newUrl ,()=>{
                            resolve()
                        }, {crossOrigin: "anonymous"})
                    })
    
                }
            }
            this.canvas.renderAll()
        }

        const json = canvas.toObject(['selectable', 'lockMovementX', 'lockMovementY', 'id'])
        return json
    }

    loadFromJSON(json, callback) {
        return new Promise(resolve => {
            this.canvas.clear()
            this.canvas.loadFromJSON(json, () => {
                this.canvas.forEachObject(obj => {
                    if(obj.type === 'image'){
                        obj.on('selected', (e)=>{
                            this.onSelectedCallBack && this.onSelectedCallBack(e.target)
                        })
                        obj.on('deselected', (e) => {
                            this.onSelectedCallBack && this.onSelectedCallBack(null)
                        })
                        obj.bringToFront()
                    }
                    const id = obj.get('id')
                    if (!id) return
                    this.objects[id + 'Object'] = obj
                })
                this.objects.hooksObject && this.objects.hooksObject.bringToFront()
                callback && callback()
                this.canvas.renderAll.bind(this.canvas)
                console.log("JSON loaded!")
                this.isInit = true
                resolve()
            });
        })

    }

    async toDataURL({blobMode}) {

        const format = "jpeg"
        const quality = "quality"

        const resultFull = this.canvas.toDataURL({
            format,
            quality: 1,
            multiplier: 2
        })
        const resultMedium = this.canvas.toDataURL({
            format,
            quality: 1,
            multiplier: 1
        })
        const resultSmall = this.canvas.toDataURL({
            format,
            quality,
            multiplier: .6
        })


        let blobSmall = null
        let blobMedium = null
        let blobLarge = null
        if(blobMode){
            blobLarge = await fetch(resultFull).then(res => res.blob())
            blobMedium = await fetch(resultMedium).then(res => res.blob())
            blobSmall = await fetch(resultSmall).then(res => res.blob())
            URL.revokeObjectURL(resultFull)
            URL.revokeObjectURL(resultMedium)
            URL.revokeObjectURL(resultSmall)
        }
        
        return {
            large: blobMode ? blobLarge : resultFull,
            medium: blobMode ? blobMedium : resultMedium,
            small: blobMode ? blobSmall : resultSmall
        }
    }

    async update(props) {
        //funcion para actualizar los texto de la imagen
        const { productName, ref, price, whatsapp, background } = props
        const { priceObject, productNameRefObject } = this.objects

        
        if(typeof price === 'string'){
            this.price = {
                value: price,
                currency: 'COP'
            }
        } else if(typeof price === 'object'){
            this.price = price
        }

        this.objects.infoBgObject && this.objects.infoBgObject.set('fill', background || this.BACKGROUND)
        const TEXT_COLOR = fontColorContrast(background || this.BACKGROUND)
        this.TEXT_COLOR = TEXT_COLOR

        if (this.objects.companyLogoObject) {
            const oldScaleX = this.objects.companyLogoObject.scaleX
            const oldPos = this.objects.companyLogoObject.getPointByOrigin('center', 'center')
            this.canvas.remove(this.objects.companyLogoObject)
            const companyLogoObject = await this.loadSVG(this.logo[TEXT_COLOR], {})
            companyLogoObject.scale(oldScaleX)
            companyLogoObject.set('lockMovementX', true)
            companyLogoObject.setPositionByOrigin(oldPos, 'center', 'center')
            companyLogoObject.set('id', 'companyLogo')
            this.objects.companyLogoObject = companyLogoObject
        }

        priceObject && priceObject.set('text', `${(this.price.currency === 'USD') ? 'USD ' : ''}${this.price.value}`)
        priceObject && priceObject.set('fontSize', this.price.currency === 'USD'? 51 : 60)
        priceObject && priceObject.set('fill', TEXT_COLOR)


        productNameRefObject && productNameRefObject.set('text', `${productName || this.productName}\nRef. ${ref || this.ref}`)
        productNameRefObject && productNameRefObject.set('top', priceObject.lineCoords.tl.y - productNameRefObject.height - 25)
        productNameRefObject && productNameRefObject.set('fill', TEXT_COLOR)

        const wpValue = props.hasOwnProperty('whatsapp') ? whatsapp : this.whatsapp
        if(props.hasOwnProperty('whatsapp')){
            await this.renderSocials(wpValue)
        }

        const productNameValue = props.hasOwnProperty('productName') ? productName : this.productName
        const refValue = props.hasOwnProperty('ref') ? ref : this.ref

        this.productName = productNameValue
        this.ref = refValue
        

        this.canvas.renderAll()
    }

    addVarianHook(hooks = 0) { 
        return new Promise((resolve, reject) => {
            if(hooks === 0){
                this.objects.hooksObject && this.canvas.remove(this.objects.hooksObject)
                resolve()
                return
            }

            if (hooks > 4 || hooks < 1) {
                reject('El valor de hooks tiene que estar entre 1 y 4')
                return
            }
    
            let oldPosition = this.objects.hooksObject ? this.objects.hooksObject.getPointByOrigin('center', 'center') : null
            this.objects.hooksObject && this.canvas.remove(this.objects.hooksObject)
            
            const hooksImages = [
                'https://i.ibb.co/vJDQhpC/hooks-1.jpg',
                'https://i.ibb.co/Q6D78sK/hooks-2.jpg',
                'https://i.ibb.co/BjrKY6k/hooks-3.jpg',
                'https://i.ibb.co/zVyNmB1/hooks-4.jpg'
            ]
    
            const RADIUS = 80

            fabric.Image.fromURL(hooksImages[hooks - 1], img => {
                const circle1 = new fabric.Circle({
                    radius: 40,
                    fill: 'transparent',
                    left: 400,
                    top: 100,
                    stroke: 'red',
                    strokeWidth: 4,
                    originX: 'center'
                })

                const circle2 = new fabric.Circle({
                    radius: RADIUS,
                    fill: 'transparent',
                    left: 400,
                    top: 350,
                    stroke: 'red',
                    strokeWidth: 4,
                    originX: 'center'
                })

                const circle1Coords = circle1._getCoords()
                const circle1Center = circle1.getCenterPoint()


                const circle2Coords = circle2._getCoords()
                const circle2Center = circle2.getCenterPoint()

                const line1 = new fabric.Line([circle1Coords.br.x - circle1.strokeWidth, circle1Center.y, circle2Coords.br.x - circle2.strokeWidth, circle2Center.y], {
                    stroke: 'red',
                    strokeWidth: 4
                })
                const line2 = new fabric.Line([circle1Coords.bl.x, circle1Center.y, circle2Coords.bl.x, circle2Center.y], {
                    stroke: 'red',
                    strokeWidth: 4
                })

                const scaleImageValue = fabric.util.findScaleToFit(img, circle2)
                img.scale(scaleImageValue)
                console.log(img.crossOrigin)


                img.set({
                    left: circle2Center.x,
                    top: circle2Center.y,
                    originX: 'center',
                    originY: 'center',
                    angle: 40,
                    clipPath: new fabric.Circle({
                        radius: img.width / 2,
                        originX: 'center',
                        originY: 'center',
                    })
                })

                circle2.bringToFront()


                const group = new fabric.Group([img, circle1, circle2, line1, line2], {
                    angle: -40,
                    id: 'hooks'
                })

                oldPosition && group.setPositionByOrigin(oldPosition, 'center', 'center')


                group.bringToFront()
                this.canvas.setActiveObject(group)
                this.objects['hooksObject'] = group
                this.canvas.add(group)
                resolve()
            }, {crossOrigin: "anonymous"})

        })

    }

    lockCanvas(option = true) {
        if (!option) {
            this.objects.lockRectObject && this.canvas.remove(this.objects.lockRectObject)
            console.log("se quito el bloqueo")
            return
        }
        const rect = new fabric.Rect({
            left: 0,
            top: 0,
            fill: 'transparent',
            width: this.width,
            height: this.height,
            selectable: false,
            excludeFromExport: true,
            hoverCursor: 'not-allowed'
        });
        this.objects.lockRectObject = rect
        this.canvas.add(rect);
    }

    removeBgFabric(imageFile) {
        const filter = new fabric.Image.filters.RemoveColor({
            distance: .055
        })

        const imageUrl = URL.createObjectURL(imageFile)
        return new Promise(resolve => {
            fabric.Image.fromURL(imageUrl, (image) => {
                const scaleValue = fabric.util.findScaleToFit(image, this.canvas)
                const rezise = new fabric.Image.filters.Resize({
                    scaleY: scaleValue * 2,
                    scaleX: scaleValue * 2
                })
                image.scale(scaleValue)
                image.filters.push(rezise)
                image.filters.push(filter)
                image.applyFilters()
                resolve(image)
            })
        })
    }

    async metalicColor(inputColor){
        const color = Color(inputColor)
        
        const darkColor = color.isDark() ? color.hsl().toString() : color.darken(0.32).toString()
        const darkColorObj = color.isDark() ? color : color.darken(0.32)
        const lightColor = color.isDark()? color.lighten(0.5).hsl().toString() : color.hsl().toString()
        const lightColorObj = color.isDark()? color.lighten(0.5) : color
        this.BACKGROUND = darkColorObj.mix(lightColorObj, 0.5).hex().toString()
        
        const info = this.objects.infoBgObject
        const gradient = new fabric.Gradient({
            type: 'linear',
            gradientUnits: 'pixels',
            coords: {x1: 0 - 100, y1: info.height , x2: info.width + 100, y2: 0},
            colorStops:[
                {offset: 0, color: darkColor},
                {offset: .15, color: lightColor},
                {offset: .30, color: darkColor},
                {offset: .41, color: lightColor},
                {offset: .606, color: darkColor},
                {offset: .718, color: lightColor},
                {offset: .86, color: lightColor},
                {offset: 1, color: darkColor}
            ]
        })
        //await this.render({whatsapp: this.whatsapp})
        this.objects.infoBgObject.set('fill', gradient)
        this.canvas.renderAll()
        return
    }

    static getMetalicColors(inputColor){
        const color = Color(inputColor)
        const darkColor = color.isDark() ? color.hex().toString() : color.darken(0.32).hex().toString()
        const darkColorObj = color.isDark() ? color : color.darken(0.32)
        const lightColor = color.isDark()? color.lighten(0.5).hex().toString() : color.hex().toString()
        const lightColorObj = color.isDark()? color.lighten(0.5) : color
        const mixBackground = darkColorObj.mix(lightColorObj, 0.5).hex().toString()
        return {
            lightColor,
            darkColor,
            contrastText: fontColorContrast(mixBackground)
        }
    }

    renderDivider(pos=320){
        const rect = new fabric.Rect({
            top: 0,
            height: this.canvas.height,
            width: 15,
            left: pos,
            fill: '#333',
            selectable: false
        })

        const tan60 = Math.tan(1.0472) //tanjente de 60 grados
        const angleDistance = ((rect.height/tan60) - rect.width) / 2

        const gradient = new fabric.Gradient({
            type: 'linear',
            gradientUnits: 'pixels',
            coords: {x1: 0 - angleDistance, y1: rect.height - 100 , x2: rect.width + angleDistance, y2: 100},
            colorStops:[
                {offset: 0, color: '#BA8B01'},
                {offset: .184, color: '#FFFFCB'},
                {offset: .298, color: '#FFFFCB'},
                {offset: .43, color: '#ECCE76'},
                {offset: .489, color: '#A26F14'},
                {offset: .605, color: '#A26F14'},
                {offset: .67, color: '#E4BA58'},
                {offset: .685, color: '#A65B1A'},
                {offset: .774, color: '#FFFFCD'},
                {offset: .795, color: '#FFFFCD'},
                {offset: .846, color: '#E5BD5D'},
                {offset: .886, color: '#BB913B'},
                {offset: .911, color: '#BB913B'},
                {offset: .95, color: '#C5992E'},
                {offset: 1, color: '#7F470A'},
            ]
        })
        rect.set('fill', gradient)
        this.canvas.add(rect)
    }

    imageCount(){
        return this.canvas._objects.reduce((prev, curr) =>{
            const value = curr.type === 'image' ? 1 : 0
            return prev + value
        }, 0)
    }

    async renderAndGenerateBlob(json, values, options={}){
        this.canvas.clear()
        this.objects = {}
        await this.loadFromJSON(json)
        await this.render(values)
        if(options.hasOwnProperty('withWhatsapp') && !options.withWhatsapp){
            this.canvas.remove(this.objects.whatsappObject)
            this.canvas.remove(this.objects.whatsappLogoObject)
        }else if(options.hasOwnProperty('withWhatsapp') && options.withWhatsapp){
            await this.renderSocials(options.whatsapp)
        }
        

        if(options.hasOwnProperty('price') && !options.price){
            this.canvas.remove(this.objects.priceObject)
        }
        
        //Algoritmo para remplazar el logo
        if(options.withLogo){
            const logoColor = {
                "#ffffff": options.logo.light,
                "#000000": options.logo.dark
            }
            const logo = await this.loadSVGFromURL(logoColor[this.TEXT_COLOR])
            const originlScale = this.objects.companyLogoObject.getObjectScaling()
            const scaleValue = fabric.util.findScaleToFit(logo, this.objects.companyLogoObject)
            logo.scale((scaleValue * originlScale.scaleX))
            const pos = this.objects.companyLogoObject.getPointByOrigin('center', 'center')
            logo.setPositionByOrigin(pos, 'center', 'center')
            this.canvas.add(logo)
            this.canvas.remove(this.objects.companyLogoObject)
            this.objects.companyLogoObject = logo
        }




        this.canvas.renderAll()
        const images = await this.toDataURL({blobMode: true})
        this.canvas.clear()
        return images
    }

    loadSVGFromURL(url){
        return new Promise(resolve => {
            fabric.loadSVGFromURL(url, (objects, options) => {
                const svgObj = fabric.util.groupSVGElements(objects, options);      
                resolve(svgObj)
            })
        })
    }
}

export class BackgoundRemover {
    constructor(canvasId, rangeId, width = 896, height = 1280) {
        this.width = width
        this.height = height


        const range = document.getElementById(rangeId)
        range.setAttribute('min', '0')
        range.setAttribute('max', '0.3')
        range.setAttribute('step', '0.001')

        this.range = range

        const canvasElem = document.getElementById(canvasId)

        const mainContainerElement = document.createElement('div')
        mainContainerElement.style.position = 'relative'
        mainContainerElement.style.width = '100%'
        mainContainerElement.style.paddingBottom = `${(this.height / this.width) * 100}%`
        mainContainerElement.style.background = 'grey'
        mainContainerElement.style.boxShadow = '3px 3px 30px rgba(0,0,0,.3)'
        mainContainerElement.style.borderRadius = '5px'
        mainContainerElement.style.overflow = 'hidden'

        const secondContainerElement = document.createElement('div')
        secondContainerElement.style.position = 'absolute'
        secondContainerElement.style.top = 0
        secondContainerElement.style.bottom = 0
        secondContainerElement.style.left = 0
        secondContainerElement.style.right = 0


        mainContainerElement.appendChild(secondContainerElement)
        canvasElem.replaceWith(mainContainerElement)
        secondContainerElement.appendChild(canvasElem)


        const canvas = new fabric.Canvas(canvasId, {
            backgroundColor: '#222',
            width,
            height,
        });
        canvas.selection = false
        canvas.setDimensions({
            width: '100%',
            height: '100%'
        }, {
            cssOnly: true
        })
        this.canvas = canvas
        this.flip = false
    }

    async uploadImage(file) {    
        this.range.removeEventListener('change', this.chanegeValue)
        this.canvas.forEachObject(obj => {
            this.canvas.remove(obj)
        })
        const imageNoBg = await this.removeBgFabric(file)
        imageNoBg.set('left', 0)
        imageNoBg.set('top', 0)
        imageNoBg.set('selectable', false)

        this.canvas.centerObjectH(imageNoBg)
        this.canvas.add(imageNoBg)
        this.currentImage = imageNoBg
        this.range.value = imageNoBg.filters[1].distance
        this.range.addEventListener('change', this.chanegeValue)
    }

    chanegeValue = e => {
        const value = e.target.value
        //console.log(value)
        this.currentImage.filters[1].distance = value
        this.currentImage.applyFilters()
        this.canvas.renderAll()
    }

    modifyDistance(value) {
        console.log(this)
        this.currentImage.filters[1].distance = value
        this.currentImage.applyFilters()
        this.canvas.renderAll()
    }

    removeBgFabric(imageFile) {
        const filter = new fabric.Image.filters.RemoveColor({
            distance: .055
        })

        const imageUrl = URL.createObjectURL(imageFile)
        return new Promise(resolve => {
            fabric.Image.fromURL(imageUrl, (image) => {
                const scaleValue = fabric.util.findScaleToFit(image, this.canvas)
                const rezise = new fabric.Image.filters.Resize({
                    scaleY: scaleValue,
                    scaleX: scaleValue
                })
                image.scale(scaleValue)
                image.filters.push(rezise)
                image.filters.push(filter)
                image.applyFilters()
                resolve(image)
            })
        })
    }

    async generateImage(){
        if(!this.currentImage) throw new Error('No hay imagenes cargadas')
        this.range.removeEventListener('change', this.chanegeValue)
        this.canvas.forEachObject(obj => this.canvas.remove(obj))
        const url = this.currentImage.toDataURL({
            multiplier: 1
        })
        const blob = await fetch(url).then(res => res.blob())
        this.currentImage = null
        URL.revokeObjectURL(url)
        return blob
    }

    cancel(){
        this.currentImage = null
        this.canvas.forEachObject(obj => this.canvas.remove(obj))
    }


    clipImage(image, pos){
        
        const group = image.clipPath? image.clipPath : new fabric.Group([],{absolutePositioned: true, inverted: true,})
    
        const rect = new fabric.Circle({
            radius: 30,
            originX: 'center',
            originY: 'center',
            inverted: true,
            absolutePositioned: true
        })
        rect.setPositionByOrigin(pos, 'center', 'center')
        group.addWithUpdate(rect)
        image.clipPath = group
        this.canvas.renderAll()
    }

    flipImage(){
        if(!this.currentImage) return
        this.flip = !this.flip
        this.currentImage.set('flipX', this.flip)
        this.canvas.renderAll()
    }

}



